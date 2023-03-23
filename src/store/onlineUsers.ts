const onlineUserList = new Map();

const addUserToOnlinList = (socketID: string, userId: string) => {
  onlineUserList.set(userId, socketID);
  console.log(onlineUserList);
};

export default addUserToOnlinList;
