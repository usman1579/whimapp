import Fire from "../../../Firebase";

const USERINFO = "USERINFO";
const WHIM_LIST = "WHIM_LIST";
const WHIM_FETCH_ERROR = "WHIM_FETCH_ERROR";
const EDIT_WHIM = "EDIT_WHIM";
const CURRENT_WHIM = "CURRENT_WHIM";

export const USERDATA = (userObj) => {
  return {
    type: USERINFO,
    payload: userObj,
  };
};

export const CurrentWhimData = (data) => {
  return {
    type: CURRENT_WHIM,
    payload: data,
  };
};

export const EditWhimItem = (res) => {
  return {
    type: EDIT_WHIM,
    payload: res,
  };
};

export const FETCHWHIMLIST = (uid) => {
  return async (dispatch) => {
    try {
      const Data = [];
      await Fire.firestore()
        .collection("USERS")
        .doc(uid)
        .collection("Whim")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            Data.push({
              id: doc.id,
              name: doc.data().WhimName,
              price: doc.data().WhimPrice,
              photo: doc.data().WhimPhoto,
              days: doc.data().WhimDays,
              timeStamp: doc.data().WhimtimeStamp,
            });
          });
          dispatch({
            type: WHIM_LIST,
            payload: Data,
          });
        })
        .catch(function () {
          dispatch({
            type: WHIM_FETCH_ERROR,
            payload: true,
          });
        });
    } catch {
      dispatch({
        type: WHIM_FETCH_ERROR,
        payload: true,
      });
    }
  };
};

const InitialState = {
  USER: {
    uid: "",
    displayName: "",
    email: "",
    image: {
      src:
        "https://firebasestorage.googleapis.com/v0/b/whim-backend-b6506.appspot.com/o/Static%2F12.jpg?alt=media&token=77eb45c7-ec21-412a-84e5-86cce47ee135",
    },
  },
  WhimList: [],
  WhimFetchError: false,
  EditWhim: false,
  currentWhim: {
    id: "",
    name: "",
    price: "",
    photo: "",
    days: "",
    timeStamp: "",
  },
};

const UserReducer = (state = InitialState, action) => {
  switch (action.type) {
    case USERINFO:
      return {
        ...state,
        USER: action.payload,
      };
    case WHIM_LIST:
      return {
        ...state,
        WhimList: action.payload,
      };
    case WHIM_FETCH_ERROR:
      return {
        ...state,
        WhimFetchError: action.payload,
      };
    case EDIT_WHIM:
      return {
        ...state,
        EditWhim: action.payload,
      };
    case CURRENT_WHIM:
      return {
        ...state,
        currentWhim: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
