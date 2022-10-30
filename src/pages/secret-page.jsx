import getCookie from '@/utils/getCookie'
import getAbsolutePath from '@/utils/getAbsolutePath'
import axios from 'axios';
import validateEmail from '@/utils/validateEmail';

export async function getServerSideProps(context) {
  const { req } = context;

  let token = getCookie(req.headers.cookie, "connect.sid");

  token = token && decodeURIComponent(token).split(":")[1].split(".")[0];

  if (!token) return {
    redirect: {
      destination: "/sign-in",
      permanent: false,
    },
  };

  const request_link = getAbsolutePath(req, `/api/auth/check?token=${token}`);

  const response = await axios.get(request_link);

  if (!response.data.authenticated) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return { props: { user:response.data.user.social_id || response.data.user.email } };
}
export default function SecretPage(props){

    // https://stackoverflow.com/a/55174568/20070771
    return (
        <div className="flex h-screen bg-slate-500">
            <title>Secret page</title>
            <div className="m-auto">
                <h3>Welcome {validateEmail(props.user) ? props.user : props.user + " (this is your social id retrieved from the oauth method)"}</h3>
                <h3 className='text-center'>The session is valid for 1 minute</h3>
            </div>
      </div>
    )
}