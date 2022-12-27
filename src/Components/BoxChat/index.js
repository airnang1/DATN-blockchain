// import React, { useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import ButtonToggle from './ButtonToggle';
// import Chat from './Chat';
// import moment from 'moment';
// // import { AuthContext } from '../../Context/AuthProvider';
// import { db } from '../../Firebase/config';

// function BoxChat(props) {
//     // const data = useContext(AuthContext);
//     const [isShowForm, setIsShowForm] = useState(false);
//     const [message, setMessage] = useState('');
//     const [conversationsArray, setConversationsArray] = useState(null);
//     // const { uid } = data.user;

//     const handleChangeInputMessage = (e) => {
//         setMessage(e.target.value);
//     };

//     // const handleSubmitMessage = () => {
//     //     const msgObj = {
//     //         user_uid_1: uid,
//     //         user_uid_2: 'Phậm Tuấn',
//     //         message,
//     //     };

//     //     if (message !== '') {
//     //         db.collection('conversations')
//     //             .add({
//     //                 ...msgObj,
//     //                 isView: true,
//     //                 created: moment().format('YYYY-MM-DD HH:mm:ss'),
//     //                 createAt: new Date(),
//     //             })
//     //             .then((data) => {})
//     //             .catch((error) => {});
//     //     }
//     //     setMessage('');
//     // };

//     const handleGetRealtimeConversation = async (user) => {
//         await db
//             .collection('conversations')
//             .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
//             .orderBy('createAt', 'asc')
//             .onSnapshot((querySnapshot) => {
//                 const conversations = [];
//                 querySnapshot.forEach((doc) => {
//                     const data = doc.data();
//                     if (
//                         (data.user_uid_1 === user.uid_1 &&
//                             data.user_uid_2 === user.uid_2) ||
//                         (data.user_uid_1 === user.uid_2 &&
//                             data.user_uid_2 === user.uid_1)
//                     ) {
//                         conversations.push(doc.data());
//                     }
//                 });
//                 setConversationsArray(conversations);
//             });
//     };

//     // const handleShowFormMess = () => {
//     //     if (!isShowForm) {
//     //         handleGetRealtimeConversation({
//     //             uid_1: uid,
//     //             uid_2: 'Phạm Tuấn',
//     //         });
//     //     }
//     //     setIsShowForm(!isShowForm);
//     // };

//     const onClose = () => {
//         setIsShowForm(false);
//     };

//     return (
//         <div className="box-chat">
//             <div id="body">
//                 <ButtonToggle
//                     isShowForm={isShowForm}
//                     // handleShowFormMess={handleShowFormMess}
//                 />
//                 <Chat
//                     message={message}
//                     isShowForm={isShowForm}
//                     onClose={onClose}
//                     // data={data}
//                     // handleChangeInputMessage={handleChangeInputMessage}
//                     // handleSubmitMessage={handleSubmitMessage}
//                     // conversationsArray={conversationsArray}
//                     // uid={uid}
//                 />
//             </div>
//         </div>
//     );
// }

// BoxChat.propTypes = {};

// export default BoxChat;
