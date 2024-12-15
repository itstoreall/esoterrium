import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserInfo } from '@/src/lib/auth/getUserInfoServerAction';
import { UserData } from '@/src/types';

const useUserInfo = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['user_info'],
    queryFn: async () => (await getUserInfo()) as UserData,
    select: (res: UserData) => res,
    enabled: true,
  });

  const refetch = () => {
    console.log('refetch info!!!');
    queryClient.invalidateQueries({ queryKey: ['user_info'] });
  };

  return { userInfo: data, error, isLoading, isSuccess, refetch };
};

export default useUserInfo;
