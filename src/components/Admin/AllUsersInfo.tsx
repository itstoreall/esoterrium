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
// import trimEmail from '@/src/utils/trimEmail';
// import Button from '@/src/components/Button';

// type Props = {};

const AllUsersInfo = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  const { copyValue, isCopied } = useCopyState();

  useEffect(() => {
    getAllUsers().then((data) => {
      console.log('data:', data);
      if (data) setUsers(data);
    });
  }, []);

  return (
    <ul className="admin-all-users-info-list">
      {users.map((user) => (
        <li key={user.id} className="admin-all-users-info-list-item">
          <div className="admin-all-users-info-list-item-content">
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
                {trimString(user.id, 1, 3)}
              </span>
            </div>

            <div className="admin-all-users-info-list-item-content-box">
              <span className="admin-all-users-info-list-item-content-key">
                Name:
              </span>
              <span
                className={`admin-all-users-info-list-item-content-value-onclick ${
                  isCopied(`${user.id}_name`) ? 'copied' : ''
                }`}
                onClick={() => copyValue(`${user.id}_name`, user.name!)}
              >
                {sliceLimitString(user.name!, 12)}
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
                  trimEmail('serhiistanislav@rambler.com', 3, 3),
                  22
                )} */}
                {sliceLimitString(trimEmail(user.email, 3, 3), 22)}
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
                    normalizeDate(user.createdAt)
                  )
                }
              >
                {normalizeDate(user.createdAt)}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AllUsersInfo;
