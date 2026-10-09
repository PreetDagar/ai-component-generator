import React from "react";
import "../App.css"; // make sure the path is correct
import { FaUser } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { RiSettings3Fill } from "react-icons/ri";
const Navbar = () => {
return (
<div
style={{
position: "fixed",
top: 0,
left: 0,
width: "100%",
height: "70px",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
padding: "0 40px",
borderBottom: "1px solid #2d2d2d",
backgroundColor: "black",
zIndex: 1000,
      }}
>
{/* LEFT: Gradient Text Logo */}
<h3 className="sp-text" style={{ fontSize: "22px", fontWeight: "bold" }}>
        GenUI
</h3>
{/* RIGHT: Icons with .icon class */}
<div style={{ display: "flex", gap: "20px" }}>
<div className="icon">
<HiSun />
</div>
<div className="icon">
<FaUser />
</div>
<div className="icon">
<RiSettings3Fill />
</div>
</div>
</div>
  );
};
export default Navbar;