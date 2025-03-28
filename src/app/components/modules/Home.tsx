import Navbar from '@/app/components/Navbar';
import PostInput from '@/app/components/posts/PostInput';

const HomePage: React.FC = () => {
    return (
        <>
            <Navbar />
            <main className='mtb mx-auto mt-[100px] mb-[100px] flex max-w-2xl flex-col justify-center gap-6 px-3 pt-6 font-[family-name:var(--font-geist-sans)] sm:gap-12 sm:px-0 sm:pt-0'>
                <PostInput />
            </main>
        </>
    );
};

export default HomePage;
