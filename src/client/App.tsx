import * as React from 'react';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import NewBlog from './components/NewBlog';
import Previews from './components/Previews';
import FullBlog from './components/FullBlog';
import EditBlog from './components/EditBlog';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Previews} />
				<Route path='/newblog' component={NewBlog} />
				<Route exact path='/blogs/:id' component={FullBlog} />
				<Route path='/blogs/:id/edit' component={EditBlog} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
