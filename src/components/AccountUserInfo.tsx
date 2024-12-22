/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // SessionContextValue
import { GoSignOut } from 'react-icons/go';
import { Acc } from '@/src/hooks/useUserRole';
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import copyToClipboard from '@/src/utils/copyToClipboard';
import { BooleanState, UserData } from '@/src/types';
import convertDate from '@/src/utils/convertDate';
import trimString from '@/src/utils/trimString';
import trimEmail from '@/src/utils/trimEmail';
import SignOutButton from '@/src/components/Button/SignOutButton';
import Button from '@/src/components/Button';

type Props = {
  acc: Acc;
  name: string;
  userInfo: UserData;
  setName: Dispatch<SetStateAction<string>>;
};

const AccountUserInfo = (props: Props) => {
  const { acc, name, userInfo, setName } = props;

  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isIdCopied, setIsIdCopied] = useState(false);

  const session = useSession();

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

  const updateName = () => {
    session.update({ name });
    setIsEditNickname(false);
  };

  const handleCopyValue = (val: string, setCopiedState: BooleanState) => {
    setCopiedState(true);
    copyToClipboard(val);
    setTimeout(() => setCopiedState(false), 300);
  };

  // ---

  const copyEmailStyle = isEmailCopied ? 'copied' : '';
  const copyIdStyle = isIdCopied ? 'copied' : '';

  return (
    <ul className="user-account-info-list">
      <li className="user-account-info-list-item">
        <div className="user-account-info-list-item-content">
          <span className="user-account-info-list-item-content-key">ID:</span>
          <span
            className={`user-account-info-list-item-content-value-onclick ${copyIdStyle}`}
            // className="user-account-info-list-item-content-value-onclick"
            onClick={() => handleCopyValue(userInfo.id, setIsIdCopied)}
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
          <span
            className={`user-account-info-list-item-content-value-onclick ${copyEmailStyle}`}
            onClick={() => handleCopyValue(userInfo.email, setIsEmailCopied)}
          >
            {trimEmail(userInfo.email, 2, 2)}
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
