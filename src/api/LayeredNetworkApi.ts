import axios from 'axios';
import { basePath } from './Paths';

const backendCall = axios.create({
	baseURL: basePath,
	timeout: 10000
});

export default backendCall;