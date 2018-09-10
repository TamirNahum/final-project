import { User } from "./user-info.model";


export class UserList {
    userList: Array<User> =[];
    singleUser: User={FullName:"Guest"};
    userToEdit:User={FullName:"Guest"};
}