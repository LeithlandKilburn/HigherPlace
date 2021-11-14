const initState =
{
    msgList: [],
    messages: [],
}

const inquiryReducer = (state = initState, action) =>
{
    switch (action.type)
    {
        case "CREATE_INQUIRY":
            console.log("created inquiry.", action.inquiry.newInquiry);
            return state;

        case "CREATE_INQUIRY_ERROR":
            return state;

        case "GET_MSG_LIST":
            return {
                ...state,
                msgList: action.userChats,
            }
        case "GET_MSG_LIST_ERROR":
            return state;

        case "GET_MSGS":
            return {
                ...state,
                messages: action.prevMsgs,
            }

        case "GET_MSGS_ERROR":
            return state;

        case "CLEAR_MSGS":
            return {
                msgList: [],
                messages: [],
            }

        default:
            return state;
    }
}

export default inquiryReducer;