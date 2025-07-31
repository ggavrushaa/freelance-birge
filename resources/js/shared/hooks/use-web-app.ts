

export const useWebApp = () => {
  const data = window.Telegram.WebApp.initDataUnsafe;
  console.log("useWebApp data", data);
  const user = data.user || {
    telegram_id: "123",
    username: "Bohdan",
  };
  return {
    user,
  }
}
