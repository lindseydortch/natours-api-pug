/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either password or data
export const updateSettings = async (data, type) => {
  try {
    const url = `/api/v1/users/${
      type === 'password' ? 'updateMyPassword' : 'updateMe'
    }`;

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated succusfully`);
      // location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
