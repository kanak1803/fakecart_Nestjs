import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
  try {
    //geting data from token
    const token = request.cookies.get("token")?.value || "";
    //decoding encoded token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
