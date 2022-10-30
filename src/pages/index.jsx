import getCookie from '@/utils/getCookie'
import getAbsolutePath from '@/utils/getAbsolutePath'

export async function getServerSideProps(context) {
  const { req } = context;

  let token = getCookie(req.headers.cookie, "connect.sid");

  if (!token) return {
    redirect: {
      destination: "/sign-in",
      permanent: false,
    }
  }

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
  else {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      }
    }
  }
}

export default function Home() {
  return (
      <div className="flex h-screen bg-slate-500">
          <title>Home</title>
          <div className="m-auto">
                Hello?
          </div>
      </div>
    );
}