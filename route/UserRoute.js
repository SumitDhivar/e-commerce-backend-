import express from "express";

const userRouter = express.Router();

let users = [
    { id: 1, name: "me", email: "me@ex.com", password: "123", role: "admin" }
];

userRouter.get('',(req,res)=>{
    res.send(users);
});

userRouter.post('/register',(req,res)=>{
    const userExists = users.find((u)=>u.email == req.body.email);
    if(userExists){
        return res.status(400).send({error: "User with this email already exists"});
    }
    else{
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            ...req.body,
            role: req.body.role || "user"
        };
        users.push(newUser);
        return res.status(201)
        .send({message: "User created successfully", user: newUser});
    }
});

userRouter.delete('/:email',(req,res)=>{
    const user = users.find((u)=>u.email == req.params.email);
    if(!user){
        return res.status(404).send({error: "User not found"});
    }
    res.send('<h3>User with email '+req.params.email+' is deleted<h3/>');
});

userRouter.get('/:userId',(req,res)=>{
    const user = users.find((u)=>u.id == req.params.userId);
    if(!user){
        return res.status(404).send({error: "User not found"});
    }
    const userdata = {name: user.name, email: user.email, role: user.role};
    res.send(userdata);
});

userRouter.post('/login',(req,res)=>{
    const user = users.find((u)=>u.email == req.body.email && u.password == req.body.password);
    if(user){
        return res.send({name: user.name, email: user.email, role: user.role, message: "Login successful"});
    }
    else{
        return res.status(404).send({error: "Invalid email or password"});
    }
});

export default userRouter;