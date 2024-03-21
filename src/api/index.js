import { instance as Login, } from './login';
import {instance as getUser, updateInstance as updateUser} from './userAPI'
import {instance as getAdmin, updateInstance as updateAdmin, postInstance as postAdmin, deleteInstance as deleteAdmin} from './adminApi'

export const Instances = [
     Login,
     getUser,updateUser,
     getAdmin,updateAdmin,postAdmin,deleteAdmin
    ];

