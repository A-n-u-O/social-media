import { jwtDecode } from "jwt-decode";
type JwtPayload = {
  _id: string;
  exp: number;
  firstname: string;
  lastname: string;
  email: string;
  profilePicture: string;
};
export const getDecodedJwt = () => {
  const token = localStorage.getItem("token") || "";
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    if (new Date().getSeconds() < decoded.exp) {
      return decoded;
    } else {
      localStorage.removeItem("token");
    }
    console.log(decoded);
  }
  return null;
};

export const getDecodedJwtForPost = () => {
  return localStorage.getItem("token") || "";
};

export const getDecodedJwtForComment = () => {
  return localStorage.getItem("token") || "";
};

export const getDecodedJwtForLikes = () => {
  return localStorage.getItem("token") || "";
};
