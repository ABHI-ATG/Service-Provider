import {Link} from 'react-router-dom';

const Footer=()=>{
    return (
       
<footer class="bg-white">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="#" class="flex items-center mb-4 sm:mb-0">
                <img src="./Images/slogo.jpg" class="h-8 mr-3" alt="Servecily Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Servecily</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-xl font-bold text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link to="/Signinn" class="mr-4 hover:underline md:mr-6 ">Register Professionals</Link>
                </li>
                <li>
                    <Link to="/Loginn" class="mr-4 hover:underline md:mr-6">Login Professionals</Link>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to="/" className=' hover:underline'>Servecily</Link>. All Rights Reserved.</span>
    </div>
</footer>


    )
}
export default Footer;