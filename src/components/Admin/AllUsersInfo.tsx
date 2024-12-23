/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react'; // SessionContextValue
import useCopyState from '@/src/hooks/useCopyState';
// import convertDate from '@/src/utils/convertDate';
import { getAllUsers } from '@/src/lib/auth/getAllUsersServerAction';
import sliceLimitString from '@/src/utils/sliceLimitString';
import normalizeDate from '@/src/utils/normalizeDate';
import trimString from '@/src/utils/trimString';
import trimEmail from '@/src/utils/trimEmail';
import { UserData } from '@/src/types';
import Select from '../Form/Select';
import { setUserRole } from '@/src/lib/auth/setUserRoleServerAction';
import { AuthRole } from '@prisma/client';
import { AuthRoleEnum } from '@/src/enum';
// import trimEmail from '@/src/utils/trimEmail';
// import Button from '@/src/components/Button';

// type Props = {};

const AllUsersInfo = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  const [selectOptions] = useState(['ADMIN', 'USER', 'GUEST']);
  const [isSelectError, setSelectError] = useState(false);
  const [isPending, setPending] = useState(false);
  const [isReset, setReset] = useState(false);

  const { copyValue, isCopied } = useCopyState();

  useEffect(() => {
    getAllUsers().then((data) => {
      if (data) setUsers(data as UserData[]);
    });
  }, []);

  const handleRoleSelect = async (userId: string, newRole: string) => {
    setPending(true);
    setSelectError(false);

    try {
      // Update the role on the server
      const success = await setUserRole(userId, newRole as AuthRole);
      if (!success) throw new Error('Role update failed');

      // Update the local state to reflect the new role
      // setUsers((prev) =>
      //   prev.map((user) =>
      //     user.id === userId ? { ...user, role: newRole } : user
      //   )
      // );
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, role: newRole as AuthRoleEnum } // Explicitly cast `newRole` to `AuthRole`
            : user
        )
      );
    } catch (error) {
      console.error(error);
      setSelectError(true);
    } finally {
      setPending(false);
    }
  };

  return (
    <ul className="admin-all-users-info-list">
      {users.map((user) => (
        <li key={user.id} className="admin-all-users-info-list-item">
          <div className="admin-all-users-info-list-item-content">
            <div className="admin-all-users-info-list-item-content-box-wrap">
              <div className="admin-all-users-info-list-item-content-box">
                <span className="admin-all-users-info-list-item-content-key">
                  ID:
                </span>
                <span
                  className={`admin-all-users-info-list-item-content-value-onclick ${
                    isCopied(user.id) ? 'copied' : ''
                  }`}
                  onClick={() => copyValue(user.id, user.id)}
                >
                  {trimString(user.id, 3, 9)}
                </span>
              </div>

              <div className="admin-all-users-info-list-item-content-box">
                <span className="admin-all-users-info-list-item-content-key">
                  Email:
                </span>
                <span
                  className={`admin-all-users-info-list-item-content-value-onclick ${
                    isCopied(user.email) ? 'copied' : ''
                  }`}
                  onClick={() => copyValue(user.email, user.email)}
                >
                  {sliceLimitString(
                    trimEmail('serhiistanislav@rambler.com', 4, 4),
                    23
                  )}
                  {/* {sliceLimitString(trimEmail(user.email, 3, 3), 22)} */}
                </span>
              </div>

              <div className="admin-all-users-info-list-item-content-box">
                <span className="admin-all-users-info-list-item-content-key">
                  Рейт:
                </span>
                <span
                  className={`admin-all-users-info-list-item-content-value-onclick ${
                    isCopied(`${user.id}_points`) ? 'copied' : ''
                  }`}
                  onClick={() =>
                    copyValue(`${user.id}_points`, user.points.toString())
                  }
                >
                  {2087346}
                  {/* {trimString(user.points.toString(), 0, 10)} */}
                </span>
              </div>
            </div>

            <div className="admin-all-users-info-list-item-content-box-wrap">
              <div className="admin-all-users-info-list-item-content-box">
                <span className="admin-all-users-info-list-item-content-key">
                  Регистрация:
                </span>
                <span
                  className={`admin-all-users-info-list-item-content-value-onclick ${
                    isCopied(`${user.id}_registred`) ? 'copied' : ''
                  }`}
                  onClick={() =>
                    copyValue(
                      `${user.id}_registred`,
                      normalizeDate(user.createdAt, 'DD-MM-YY')
                    )
                  }
                >
                  {normalizeDate(user.createdAt, 'DD-MM-YY')}
                </span>
              </div>

              <div className="admin-all-users-info-list-item-content-box">
                <span className="admin-all-users-info-list-item-content-key">
                  Никнейм:
                </span>
                <span
                  className={`admin-all-users-info-list-item-content-value-onclick ${
                    isCopied(`${user.id}_name`) ? 'copied' : ''
                  }`}
                  onClick={() => copyValue(`${user.id}_name`, user.name!)}
                >
                  {/* {sliceLimitString('eqweqweqeqeqweqeqeqw', 11)} */}
                  {sliceLimitString(user.name!, 11)}
                </span>
              </div>

              <div className="admin-all-users-info-list-item-content-box">
                <span className="admin-all-users-info-list-item-content-key">
                  Статус:
                </span>
                <span>
                  {/* {user.role} */}
                  {/* <Select
                    className="admin-all-users-info-list-item-content-value-select"
                    options={selectOptions}
                    initialOption={null}
                    placeholder="Статус"
                    onSelect={handleRoleSelect}
                    isError={isSelectError}
                    isReset={isReset}
                    isDisable={isPending}
                  /> */}
                  <Select
                    className="admin-all-users-info-list-item-content-value-select"
                    options={selectOptions}
                    initialOption={'INFLUENCER'}
                    // initialOption={
                    //   selectOptions.find((opt) => opt === user.role) || null
                    // }
                    placeholder="Статус"
                    onSelect={(newRole) => handleRoleSelect(user.id, newRole)}
                    isError={isSelectError}
                    isReset={isReset}
                    isDisable={isPending}
                  />
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AllUsersInfo;
