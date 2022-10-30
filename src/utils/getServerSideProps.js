export async function getServerSideProps(context) {
  const { req } = context;

  let token = getCookie(req.headers.cookie, "connect.sid");

  if (!token) return { props: {} };

  token = token && decodeURIComponent(token).split(":")[1].split(".")[0];

  const request_link = getAbsolutePath(req, `/api/auth/check?token=${token}`);

  const response = await axios.get(request_link);

  if (response.data.authenticated) {
    return {
      redirect: {
        destination: "/secret-page",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
