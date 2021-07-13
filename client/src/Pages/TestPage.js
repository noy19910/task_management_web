import React, {useEffect} from 'react';
import {getUser, insertUser} from '../serverAPI';
export default function TestPage () {
  useEffect (() => {
    const user1 = {
      email: 'tair@gmail.com',
      password: '123',
      username: 'tair',
    };
    const user2 = {
      email: 'noy@gmail.com',
      password: '123',
      username: 'noy',
    };

    insertUser(user2).then(res => {
        console.log(res.data);
    })
    // getUser (user1).then(res => {
    //     const rc = res.data.rowCount
    //     if(rc == 0){
    //         console.log("user not found");
    //     }else{
    //         console.log("user",res.data.rows[0]);
    //     }
      
    // });
  }, []);

  return (
    <div>
      Test page
    </div>
  );
}
