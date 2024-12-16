/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // SessionContextValue
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import copyToClipboard from '@/src/utils/copyToClipboard';
import trimString from '../utils/trimString';
// import { Session } from 'next-auth';
import { Acc } from './Page/Dashboard';
import { UserData } from '../types';
import convertDate from '../utils/convertDate';
import SignOutButton from './Button/SignOutButton';
import { GoSignOut } from 'react-icons/go';
import Button from './Button';
import { unlinkGoogleAccount } from '../lib/auth/unlinkGoogleAccountServerAction';
import { handleGoogleSignIn } from '../lib/auth/googleSignInServerAction';

type Props = {
  acc: Acc;
  name: string;
  userInfo: UserData;
  setIsCopied: Dispatch<SetStateAction<boolean>>;
  copyStyle: string;
  setName: Dispatch<SetStateAction<string>>;
};

const AccountUserInfo = (props: Props) => {
  const { acc, name, userInfo, copyStyle, setIsCopied, setName } = props;

  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [isEditNickname, setIsEditNickname] = useState(false);
  // const [isCopied, setIsCopied] = useState(false);

  const session = useSession();

  const updateName = () => {
    session.update({ name });
    setIsEditNickname(false);
  };

  const handleCopyValue = (val: string) => {
    setIsCopied(true);
    copyToClipboard(val);
    setTimeout(() => setIsCopied(false), 300);
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
  }, []);

  return (
    <ul className="user-account-info-list">
      <li className="user-account-info-list-item">
        <div className="user-account-info-list-item-content">
          <span className="user-account-info-list-item-content-key">ID:</span>
          <span
            className={`user-account-info-list-item-content-value-onclick ${copyStyle}`}
            // className="user-account-info-list-item-content-value-onclick"
            onClick={() => handleCopyValue(userInfo.id)}
          >
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
            E-mail:
          </span>
          <span className="user-account-info-list-item-content-value">
            {/* {acc.} */}
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
                className="user-account-info-list-item-content-value-onclick"
                onClick={() => setIsEditNickname(true)}
              >
                {session?.data?.user?.name}
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
                  clickContent={() => updateName()}
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
  );
};

export default AccountUserInfo;
