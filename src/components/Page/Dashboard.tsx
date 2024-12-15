/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import useUserRole from '@/src/hooks/useUserRole';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import { setUserRole } from '@/src/lib/auth/setUserRoleServerAction';
import { AuthRoleEnum } from '@/src/enum';
import { GoSignOut } from 'react-icons/go';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
import SignOutButton from '@/src/components/Button/SignOutButton';
import Title from '@/src/components/Layout/Title';
import LoaderBlock from '../LoaderBlock';
import trimString from '@/src/utils/trimString';
import useUserInfo from '@/src/hooks/useUserInfo';
import convertDate from '@/src/utils/convertDate';
import Button from '../Button';

const Dashboard = () => {
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [name, setName] = useState('');
  const [isEditNickname, setIsEditNickname] = useState(false);

  // ---

  /*
  const [notesText, setNotesText] = useState('eee');
  const handleNotes = (val: string) => {
    // save to localStorage
    setNotesText(val);
  };
  */

  const [notesText, setNotesText] = useState(
    () => localStorage.getItem('notesText') || ''
  );
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNotes = (val: string) => {
    setNotesText(val);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('notesText', val);
    }, 2000);
  };

  // ---

  const { userInfo } = useUserInfo();

  const acc = useUserRole();

  const [selectedRole, setSelectedRole] = useState<AuthRoleEnum>(
    AuthRoleEnum.Guest
  );

  const session = useSession();

  const handleUserName = async (user: User) => {
    const { name: userName, email } = user;
    if (userName) {
      setName(userName);
    } else if (!userName && email) {
      const emailName = email.split('@')[0];
      session.update({ name: emailName });
    }
  };

  // const handleUserName = async (user: User) => {
  //   const { name: userName, email } = user;
  //   if (userName) return;
  //   if (!userName && email) {
  //     const emailName = email.split('@')[0];
  //     session.update({ name: emailName });
  //   }
  //   /*
  //   if (userName) {
  //     setName(userName);
  //   } else if (!userName && email) {
  //     const emailName = email.split('@')[0];
  //     session.update({ name: emailName });
  //   }
  //   */
  // };

  const handleChangeUserRole = async () => {
    if (!userInfo?.id) {
      console.error('User ID is missing or invalid:', userInfo?.id);
      return;
    }
    try {
      await setUserRole(userInfo?.id, selectedRole);
      await acc.handleUserRole();
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  const handleUpdateName = () => {
    session.update({ name });
    setIsEditNickname(false);
  };

  useEffect(() => {
    const accountLinkStatus = async () => {
      try {
        const accountLinkStatus = await getAccountLinkStatus();
        setIsAccountLinked(accountLinkStatus);
      } catch (error) {
        console.error('Failed to get account link status:', error);
      }
    };
    acc.handleUserRole();
    accountLinkStatus();

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // useEffect(() => {
  //   const user = session.data?.user;
  //   if (userInfo?.id) {
  //     // setUserId(user.id);
  //     handleUserName(userInfo);
  //   }
  // }, [user]);

  useEffect(() => {
    const user = session.data?.user;
    if (user?.id) {
      // setUserId(user.id);
      handleUserName(user);
    }
  }, [session]);

  if (!userInfo || !session.data?.user)
    return <LoaderBlock className={'light-loader-block'} />;

  return (
    <Main className={'dashboard-page-main'}>
      <Section className={'main-hero-section'}>
        <Title
          tag="h2"
          className="page-main-title color-light"
          text="Аккаунт"
        />
      </Section>

      <Section className={'dashboard-section'}>
        <div className="user-account-block">
          <ul className="user-account-info-list">
            <li className="user-account-info-list-item">
              <div className="user-account-info-list-item-content">
                <span className="user-account-info-list-item-content-key">
                  ID:
                </span>
                <span className="user-account-info-list-item-content-value">
                  {trimString(userInfo.id, 8, 5)}
                </span>
              </div>
            </li>
            <li className="user-account-info-list-item">
              <div className="user-account-info-list-item-content">
                <span className="user-account-info-list-item-content-key">
                  Статус:
                </span>
                <span className="user-account-info-list-item-content-value">
                  {acc.userRole}
                </span>
              </div>
            </li>
            <li className="user-account-info-list-item">
              <div className="user-account-info-list-item-content">
                <span className="user-account-info-list-item-content-key">
                  Никнейм:
                </span>
                <>
                  {!isEditNickname ? (
                    <span
                      className="user-account-info-list-item-content-value"
                      onClick={() => setIsEditNickname(true)}
                    >
                      {session.data.user.name}
                    </span>
                  ) : (
                    <div className="user-account-info-list-item-content-value-input-box">
                      <input
                        className="user-account-info-list-item-content-value-input"
                        type="text"
                        placeholder={'Введите никнейм'}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />

                      <Button
                        className="small-border-button-as-system"
                        clickContent={() => handleUpdateName()}
                      >
                        сохранить
                      </Button>
                    </div>
                  )}
                </>
              </div>
            </li>
            <li className="user-account-info-list-item">
              <div className="user-account-info-list-item-content">
                <span className="user-account-info-list-item-content-key">
                  Рейтинг:
                </span>
                <span className="user-account-info-list-item-content-value">
                  {userInfo.points}
                </span>
              </div>
            </li>
            <li className="user-account-info-list-item">
              <div className="user-account-info-list-item-content">
                <span className="user-account-info-list-item-content-key">
                  Регистрация:
                </span>
                <span className="user-account-info-list-item-content-value">
                  {convertDate(userInfo.createdAt)}
                </span>
              </div>
            </li>
            <li className="user-account-info-list-item">
              <div className="user-account-info-list-item-content-button-block">
                <SignOutButton
                  className="nav-link-react-icon-button"
                  content={<GoSignOut size={20} />}
                  title={'Вьіход'}
                />
                <Button
                  className="dashboard-text-button disabled"
                  clickContent={
                    isAccountLinked
                      ? async () => {
                          await unlinkGoogleAccount().then(() => {
                            setIsAccountLinked(false);
                          });
                        }
                      : async () => {
                          await handleGoogleSignIn('dashboard').then(() => {
                            setIsAccountLinked(true);
                          });
                        }
                  }
                  isDisable
                >
                  {isAccountLinked ? 'Disconnect Account' : 'Connect Account'}
                </Button>
              </div>
            </li>
          </ul>

          <div className="user-account-notes-block">
            {/* <div>
              <MDEditor.Markdown source={'Hello!'} />
            </div> */}

            <div>
              <textarea
                // ref={taRef}
                className={'user-account-notes-textarea'}
                value={notesText}
                onChange={(e) => handleNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* {acc.userRole === AuthRoleEnum.Influencer && ( */}
        {acc.userRole === AuthRoleEnum.Admin && (
          <>
            <div className="field-input-container">
              <input
                className="field-input"
                type="text"
                placeholder={'Enter name'}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <button
                className="update-field-button"
                onClick={() => session.update({ name })}
              >
                Update Name
              </button>

              <select
                value={selectedRole}
                onChange={(event) =>
                  setSelectedRole(event.target.value as AuthRoleEnum)
                }
                className="field-input"
              >
                {Object.values(AuthRoleEnum).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <button
                className="update-field-button"
                onClick={handleChangeUserRole}
              >
                Update Role
              </button>
            </div>

            {/* <button
              className="link-account-button"
              onClick={
                isAccountLinked
                  ? async () => {
                      await unlinkGoogleAccount().then(() => {
                        setIsAccountLinked(false);
                      });
                    }
                  : async () => {
                      await handleGoogleSignIn('dashboard').then(() => {
                        setIsAccountLinked(true);
                      });
                    }
              }
            >
              {isAccountLinked
                ? 'Disconnect Google Account'
                : 'Connect Google Account'}
            </button> */}
          </>
        )}
      </Section>

      <Section className={'main-final-section'}>{null}</Section>
    </Main>
  );
};

export default Dashboard;
