//Как создавать приложение на 18-й версии реакта

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


//Как создавать приложение на 17-й версии реакта

import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Button} from './App';
import BootstrapTest from './BootstrapTest';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';


const BigButton = styled(Button)`
	margin: 0 auto;
	width: 245px;
	text-align: center;
`;

ReactDOM.render(
	<StrictMode>
		<App/>
		<BigButton as="a">Отправить отчёт</BigButton>
		<BootstrapTest></BootstrapTest>
	</StrictMode>,
	document.getElementById('root')
);

// const element = <h2>Hello World</h2>; // Тут же, бейбель будет переводить данный код в такой формат, как написан ниже
// const element = React.createElement('h2', {className: 'greetings'}, 'Hello world'); //Если не используем JSX, то нужно создавать элементы через класс React

// const text = 'Hello world!';

// const element = (
// 	<div>
// 		<h2 className="testClassName">{text}</h2>
// 		<input type="text" />
// 		<label htmlFor=".testClassName"></label>
// 		<button tabIndex="0">button</button>
// 	</div>
// );

// ReactDOM.render(
// 	element,
// 	document.getElementById('root')
// );

