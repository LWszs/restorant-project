
function isAuthenticated(request,respond,next){
    if(request.isAuthenticated()){
        return next();
    }
    respond.sendStatus(400);
}

export default isAuthenticated