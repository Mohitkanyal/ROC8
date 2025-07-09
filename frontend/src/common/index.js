const backendDomain = process.env.REACT_APP_BACKEND_URL
const SummaryApi = {
    register :{
        url: `${backendDomain}/api/Register`,
        method : "post"
    },
    login :{
        url: `${backendDomain}/api/Login`,
        method : "post"
    },
    current_user :{
        url: `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user :{
        url: `${backendDomain}/api/userLogout`,
        method : "get"
    },
    CourseDetails :{
                url: `${backendDomain}/api/coursedetails`,
                method : "get"
            },
    createBlog :{
        url: `${backendDomain}/api/create-blog`,
        method : "post"
    },
    bloguser :{
        url: `${backendDomain}/api/blog-user`,
        method : "post"
    },
    blogDetails :{
        url: `${backendDomain}/api/blogdetails`,
        method : "get"
    },
    salaryDetails :{
        url: `${backendDomain}/api/salarydetails`,
        method : "post"
    },
    aboutusDetail :{
        url: `${backendDomain}/api/aboutusdetail`,
        method : "post"
    },
    addJob :{
        url: `${backendDomain}/api/addjob`,
        method : "post"
    },
    DeleteJob :{
        url: `${backendDomain}/api/deletejob`,
        method : "post"
    },
    jobDetails :{
        url: `${backendDomain}/api/jobdetails`,
        method : "get"
    },
    allUser :{
        url: `${backendDomain}/api/AllUser`,
        method : "get"
    },
    updateUser :{
        url: `${backendDomain}/api/UpdateUser`,
        method : "post"
    },
    allQueries :{
        url: `${backendDomain}/api/AllQueries`,
        method : "get"
    },
    viewblogDetails :{
        url: `${backendDomain}/api/ViewblogDetails`,
        method : "post"
    },
    updateBlog :{
        url: `${backendDomain}/api/UpdateBlog`,
        method : "post"
    },
    viewqueryDetails :{
        url: `${backendDomain}/api/viewquerydetails`,
        method : "post"
    },
    ChangePassword :{
        url: `${backendDomain}/api/changepassword`,
        method : "post"
    },
    feedback :{
        url: `${backendDomain}/api/Feedback`,
        method : "post"
    },
    feedbackDetails :{
        url: `${backendDomain}/api/FeedbackDetails`,
        method : "get"
    },
    feedbackuser :{
        url: `${backendDomain}/api/Feedbackuser`,
        method : "post"
    },
    userfeedback :{
        url: `${backendDomain}/api/Userfeedback`,
        method : "post"
    },
}


export default SummaryApi;
