const Home = ({ data }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);
  return <h1>Home</h1>;
};

// Home.getInitialProps = async (ctx) => {
//   const cookie = ctx.req.headers.cookie;
//   console.log(cookie);

//   const res = await axios.get('http://localhost:3000/api/v1/auth/me', {
//     headers: { cookie },
//   });

//   if (res.statusCode === 400) {
//     Router.replace('/login');
//     return {};
//   }

//   if (res.statusCode === 400 && ctx.req) {
//     ctx.res.writeHead(302, {
//       Location: 'http://localhost:3000/login',
//     });
//     ctx.res.end();
//     return;
//   }

//   return {
//     props: {
//       data: res.data,
//     },
//   };
// };

export default Home;
