import React, { useEffect, useState } from 'react';

import InputField from '../../Components/InputField';
import InputButton from '../../Components/InputButton';
import { useDispatch, useSelector } from 'react-redux';
import {showUserThunk} from '../../features/user/userSlice'

function User() {
  const dispatch = useDispatch()
  dispatch(showUserThunk())
  return (
    <div>user</div>

  )
}

export default User
