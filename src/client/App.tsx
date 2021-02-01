import * as React from 'react';
import Navbar from './components/Navbar';
import AuthorPage from './components/AuthorPage';
import Previews from './components/Previews';
import FullBlog from './components/FullBlog';
import EditBlog from './components/EditBlog';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Previews} />
				<Route path='/authorpage' component={AuthorPage} />
				<Route exact path='/blogs/:id' component={FullBlog} />
				<Route path='/blogs/:id/edit' component={EditBlog} />
				<Route path='/login' component={Login} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
