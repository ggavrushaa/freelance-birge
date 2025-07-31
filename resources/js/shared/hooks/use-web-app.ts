

export const useWebApp = () => {
  const data = window.Telegram.WebApp.initDataUnsafe;
  const user = data.user ? {
    telegram_id: data.user.id,
    username: data.user.username,
  } : {
    telegram_id: "123",
    username: "Bohdan",
  };
  return {
    user,
  }
}
