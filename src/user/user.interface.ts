 export type TUser ={
      id:string,
      password:string,
      needChangePassword:boolean,
      role:'admin'|'faculty'|'student',
      status:'in-progress'|'blocked',
      isDeleted:boolean,
 }

//  export type NewUser={
//      role:string,
//      password:string,
//      id:string
//  }