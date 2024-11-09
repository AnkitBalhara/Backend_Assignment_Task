const handleLogout=(req,res)=>{
    console.log("Clearing cookie...");
    res.clearCookie("token", { httpOnly: true, sameSite: "lax", path: "/" });
    res.status(200).json({ message: "Logged out and token removed" });
}

module.exports = handleLogout;