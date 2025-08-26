import config from "../app/config"
import { USER_ROLE } from "../user/user.constant"
import { User } from "../user/user.model"

const superUser={
    id: '0001',
  password: config.super_admin_password,
  email:"md.tawhid.khan1998@gmail.com",
  role: USER_ROLE.superAdmin,
  status: 'in-progress' ,
  isDeleted: false
}

const seedSuperAdmin=async()=>{
// when database is connected , we will check is there any user who is super admin

const isSuperAdminExist= await User.findOne({role:USER_ROLE.superAdmin})
if(!isSuperAdminExist){
    await User.create(superUser)
}

}

export default seedSuperAdmin ;