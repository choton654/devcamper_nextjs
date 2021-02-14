const updatePassword = () => {
  // const [user, setUser] = useState({
  //   name: '',
  //   email: '',
  // });
  // const [isSubmit, setIsSubmit] = useState(false);
  // const router = useRouter();
  // const { id } = router.query;

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isSubmit) {
  //     dispatch(updateUser(id, user));
  //   }
  // }, [isSubmit]);

  // const handelChange = (e) => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handelSubmit = (e) => {
  //   e.preventDefault();
  //   setIsSubmit(true);
  // };

  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <h1 className='mb-2'>Update Password</h1>
              <form>
                <div className='form-group'>
                  <label>Current Password</label>
                  <input
                    type='password'
                    name='password'
                    className='form-control'
                    placeholder='Current Password'
                  />
                </div>
                <div className='form-group'>
                  <label>New Password</label>
                  <input
                    type='password'
                    name='newPassword'
                    className='form-control'
                    placeholder='New Password'
                  />
                </div>
                <div className='form-group'>
                  <label>Confirm New Password</label>
                  <input
                    type='password'
                    name='newPassword2'
                    className='form-control'
                    placeholder='Confirm New Password'
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='submit'
                    value='Update Password'
                    className='btn btn-dark btn-block'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default updatePassword;
