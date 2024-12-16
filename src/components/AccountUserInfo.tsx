/*
const AccountUserInfo = () => {
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
            Никнейм:
          </span>
          <div>
            {!isEditNickname ? (
              <span
                className="user-account-info-list-item-content-value-onclick"
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
}

export default AccountUserInfo
*/
