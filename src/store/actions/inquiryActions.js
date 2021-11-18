export const createInquiry = (inquiry) => 
{
    return (dispatch, getState, {getFirebase, getFirestore}) => 
    {
        // Perform asynchronous task.
        const firestore = getFirestore();
        const firebase = getFirebase();

        //Create timestamp. 
        let date = Date.now()
        let time = firebase.firestore.Timestamp.fromDate(new Date(date));

        // Create an order for userID's from least to greatest so that
        // thisConvo is the same string no matter the sender/receiver order.
        let tempUser1 = inquiry.thisConvo.slice(0, (inquiry.thisConvo.indexOf(":")));
        let tempUser2 = inquiry.thisConvo.slice(((inquiry.thisConvo.indexOf(":"))) + 1);

        let newConvo = "";
        if (tempUser1 < tempUser2)
        {
            newConvo = `${tempUser1}:${tempUser2}`;
        } else
        {
            newConvo = `${tempUser2}:${tempUser1}`;
        }

        //Create new convo in firestore if needed.
        firestore.collection("Inquiries").doc(newConvo).set({
                users: [newConvo.slice(0, (newConvo.indexOf(":"))), 
                newConvo.slice(((newConvo.indexOf(":"))) + 1)],
                convo: newConvo,
            }).then(() => {
                firestore.collection("Inquiries").doc(newConvo).collection("Messages").add({
                    Message: inquiry.newInquiry,
                    receiver: newConvo.slice(0, (newConvo.indexOf(":"))),
                    sender: newConvo.slice(((newConvo.indexOf(":"))) + 1),
                    timestamp: time,
                }).then(() => {
                    console.log("Inquiry Uploaded");
                    //Activate the reducer.
                    dispatch({type: "CREATE_INQUIRY", inquiry}); 
                }).catch((err) => {
            
                    //Activate the reducer.
                    dispatch({type: 'CREATE_INQUIRY_ERROR', err});
                });
            }).catch((err) => {
            
                //Activate the reducer.
                dispatch({type: 'CREATE_INQUIRY_ERROR', err});
            })
        }
}

export const getMsgList = (uid) => 
{
    return (dispatch, getState, {getFirebase, getFirestore}) => 
    {
        const firebase = getFirebase();

        firebase.firestore().collection("Inquiries").where("users", "array-contains", uid).
            onSnapshot(snapshot => {

                let changes = snapshot.docChanges();
                if (changes.length > 0)
                {
                    console.log(changes[0].doc.data());
                    console.log(changes[0]);
                    let userChats = [];
                    changes.forEach( async (change) => 
                    {  
                        if (change.type == 'added')
                        {
                            userChats = [ ...userChats, change.doc.data()];
                            dispatch({type: "GET_MSG_LIST", userChats})

                        } else if (change.type == 'removed')
                        {
                            console.log(change.doc.data());
                            console.log(userChats[1]);
                            console.log(change.doc.data().users);
                            let newChats = [];
                            for ( let i = 0; i < userChats.length; i++)
                            {
                                if (userChats[i].users[0] !== change.doc.data().users[0] || userChats[i].users[1]
                                    !== change.doc.data().users[1])
                                {
                                    newChats[i] = userChats[i];
                                }
                            }
                            userChats = newChats;
                            dispatch({type: "GET_MSG_LIST", userChats});
                        }
                    })
                }
            }, (error) => {
            dispatch({type: "GET_MSG_LIST_ERROR", error})
        })
    }
}

export const getMsgs = (uid, receiver) =>
{
    return (dispatch, getState, {getFirebase}) => 
    {
        // Order the 2 userID's to retrieve their convo name in Firestore.
        let tempUser1 = uid;
        let tempUser2 = receiver;

        let newConvo = "";
        if (tempUser1 < tempUser2)
        {
            newConvo = `${tempUser1}:${tempUser2}`;
        } else
        {
            newConvo = `${tempUser2}:${tempUser1}`;
        }

        const firebase = getFirebase();
        const db = firebase.firestore();
        let prevMsgs = [];

        db.collection("Inquiries").doc(newConvo).collection("Messages").
            orderBy("timestamp").limit(50).onSnapshot((querySnapshot) => 
            {
                for (let i = 0; i < querySnapshot.docs.length; i++)
                {
                    prevMsgs[i] = querySnapshot.docs[i].data();
                    console.log("This message is ", prevMsgs[i]);
                }
                //Activate the reducer.
                dispatch({type: "GET_MSGS", prevMsgs});
            }, (error) => {
                //Activate the reducer.
                dispatch({type: 'GET_MSGS_ERROR', error});
            });
    }
}

export const clearMsgs = () =>
{
    return (dispatch) =>
    {
        console.log("CLEARING MESSAGES");
        dispatch({type: "CLEAR_MSGS"});
    }
}