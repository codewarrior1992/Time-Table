import axios from "axios";
import Cookies from "js-cookie";

// 取得 token
export const getAuthToken = async () => {
  if (Cookies.get("TDX_Auth_Token") == undefined) {
    const parameter = {
      grant_type: import.meta.env.GRANT_TYPE,
      client_id: import.meta.env.CLIENT_ID,
      client_secret: import.meta.env.CLIENT_SECRET,
    };

    const auth_url =
      "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response = await axios.post(auth_url, parameter, config);

    const token = response.data.access_token;
    Cookies.set("TDX_Auth_Token", token, { expires: 24 * 60 * 60 * 1000 });

    return token;
  } else {
    return Cookies.get("TDX_Auth_Token");
  }
};

// [縣市] 取得所有路線
export const getRoutes = async (city) => {
  const url = `https://tdx.transportdata.tw/api/basic/v2/Bus/Route/City/${city}?%24&%24format=JSON`;
  const config = {
    headers: { authorization: "Bearer " + (await getAuthToken()) },
  };
  const response = await axios.get(url, config);
  return response.data;
};

// [縣市、路線] 取得車輛到站時間
export const getEstimatedTime = async (city, route) => {
  const url = `https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/${city}/${route}?&%24format=JSON`;
  const config = {
    headers: { authorization: "Bearer " + (await getAuthToken()) },
  };
  const response = await axios.get(url, config);
  return response.data;
};

// [縣市、路線] 取得站點座標
export const getStopOfRoute = async (city, route) => {
  const url = `https://tdx.transportdata.tw/api/basic/v2/Bus/StopOfRoute/City/${city}/${route}?%24format=JSON`;
  const config = {
    headers: { authorization: "Bearer " + (await getAuthToken()) },
  };
  const response = await axios.get(url, config);
  return response.data;
};
