import {useState, useRef} from 'react'
import Link from 'next/link'
import LoginError from '@/components/LoginError'
import axios from 'axios'
import getCookie from '@/utils/getCookie'
import getAbsolutePath from '@/utils/getAbsolutePath'

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
  
export default function SignIn() {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [formError, setFormError] = useState(null)

    const submit = async (e) => {
        e.preventDefault()

        const payload = {
            email : emailRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            const response = await axios.post("/api/auth/local", payload)
            if(response.data.success) {
                window.location = response.data.redirect_to
            }
        }
        catch(error){
            if(error.response.status === 401) setFormError(true)
        }
    }

    return (
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <title>Sign In</title>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Sign in to your account</h2>
            </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST" onSubmit={submit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                        ref={emailRef}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                        ref={passwordRef}
                                    />
                                </div>
                            </div>
                            {
                                formError && <LoginError/>
                            }
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div>
                                    <Link href="/api/auth/facebook/sign-in">
                                    <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Sign in with Facebook</span>
                                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                              <path
                                                  fillRule="evenodd"
                                                  d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                                  clipRule="evenodd"
                                              />
                                          </svg>
                                        </a>
                                    </Link>
                                </div>

                                <div>
                                    <Link href ='/api/auth/github/sign-in'>
                                    <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Sign in with Github</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" />
                                        </svg>
                                      </a>
                                    </Link>
                                </div>

                                <div>
                                    <Link href='/api/auth/google/sign-in'>
                                      <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Sign in with Google</span>
                                         <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                                                clipRule="evenodd"
                                            />
                                         </svg>
                                       </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
  }
  