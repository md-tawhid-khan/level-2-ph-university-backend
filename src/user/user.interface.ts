 export type TUser ={
      id:string,
      password:string,
      needChangePassword:boolean,
      role:'admin'|'faculty'|'student',
      status:'in-progress'|'blocked',
      isDeleted:boolean,
 }