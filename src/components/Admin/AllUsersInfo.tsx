/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react'; // SessionContextValue
import useCopyState from '@/src/hooks/useCopyState';
import { getAllUsers } from '@/src/lib/auth/getAllUsersServerAction';
import sliceLimitString from '@/src/utils/sliceLimitString';
import normalizeDate from '@/src/utils/normalizeDate';
import trimString from '@/src/utils/trimString';
import trimEmail from '@/src/utils/trimEmail';
import { UserData } from '@/src/types';
import SelectMulti from '../Form/SelectMulti';
import { setUserRole } from '@/src/lib/auth/setUserRoleServerAction';
import { AuthRole } from '@prisma/client';
import { AuthRoleEnum } from '@/src/enum';
import useSelectMulti from '@/src/hooks/useSelectMulti';

const { Editor, Moderator, Influencer, User, Guest, Ban } = AuthRoleEnum;

const AllUsersInfo = () => {
  const roles = [Editor, Moderator, Influencer, User, Guest, Ban];

  const [users, setUsers] = useState<UserData[]>([]);
  // const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isSelectError, setSelectError] = useState(false);
  const [isPending, setPending] = useState(false);
  const [isReset, setReset] = useState(false);
  const [selectOptions] = useState(roles);

  const { openDropdownId, handleOpenDropdown, toggleDropdown } =
    useSelectMulti();
  const { copyValue, isCopied } = useCopyState();

  useEffect(() => {
    getAllUsers().then((data) => {
      if (data) setUsers(data as UserData[]);
    });
  }, []);

  const handleRoleSelect = async (id: string, name: string, role: string) => {
    if (!confirm(`Пользователь ${name} получит статус "${role}"!`)) {
      setReset(true);
      setTimeout(() => setReset(false), 100);
      return;
    }

    setPending(true);
    setSelectError(false);
    setReset(false);

    try {
      const success = await setUserRole(id, role as AuthRole);
      if (!success) throw new Error('Role update failed');
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, role: role as AuthRoleEnum } : user
        )
      );
    } catch (error) {
      console.error(error);
      setSelectError(true);
    } finally {
      setPending(false);
      handleOpenDropdown(null);
      // setOpenDropdownId(null);
    }
  };

  /*
  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };
  // */

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
                  {/* {sliceLimitString(
                    trimEmail('serhiistanislav@rambler.com', 4, 4),
                    23
                  )} */}
                  {sliceLimitString(trimEmail(user.email, 6, 6), 26)}
                  {/* {trimEmail(user.email, 6, 6)} */}
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
                  {sliceLimitString(user.name!, 20)}
                </span>
              </div>

              <div className="admin-all-users-info-list-item-content-box">
                <span className="admin-all-users-info-list-item-content-key">
                  Статус:
                </span>
                {user.role === AuthRoleEnum.Admin ? (
                  <span
                    className={
                      'admin-all-users-info-list-item-content-value-admin'
                    }
                  >
                    {AuthRoleEnum.Admin}
                  </span>
                ) : (
                  <SelectMulti
                    className="admin-all-users-info-list-item-content-value-select"
                    options={selectOptions.filter((opt) => opt !== user.role)}
                    // initialOption={'INFLUENCER'}
                    initialOption={
                      selectOptions.find((opt) => opt === user.role) || null
                    }
                    placeholder="Статус"
                    onSelect={(newRole) =>
                      handleRoleSelect(user.id, user.name || 'No name', newRole)
                    }
                    isError={isSelectError}
                    isReset={isReset}
                    isDisable={isPending}
                    isOpen={openDropdownId === user.id}
                    onToggle={() => toggleDropdown(user.id)}
                  />
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AllUsersInfo;
