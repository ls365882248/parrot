import Mock from 'mockjs';

export const genAnswer = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Mock.mock({
          time: '9h ago',
          text: Mock.mock('@string'),
          reverser: Mock.mock('@boolean'),
        })
      );
    }, 1000);
  });
};
