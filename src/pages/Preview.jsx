import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Preview = () => {
    const { slug } = useParams();
    const iframeRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleMessage = (e) => {
            if (e.data?.type === 'preview-navigate') {
                navigate(`/preview/${e.data.slug}`);
            }
        }

        window.addEventListener('message', handleMessage);

        return () => window.removeEventListener('message', handleMessage);
    }, [])

    useEffect(() => {
        const pages = JSON.parse(sessionStorage.getItem('preview_pages') || '[]');
        const page = pages.find(p => p.slug === slug) || pages[0];
        if (!page || !iframeRef.current) return;

        const iframe = iframeRef.current;

        const interceptScript = `
        <script>
            document.addEventListener('click', function(e) {
                var link = e.target.closest('a[href]');
                if(!link) return;
                var href = link.getAttribute('href');
                if(href && href.startsWith('/preview/')){
                    e.preventDefault();
                    var slug = href.replace('/preview/', '');
                    window.parent.postMessage({type: 'preview-navigate', slug: slug}, '*');
                }
            });
        <\/script>
        `;

        const htmlWithScript = page.html.replace('</body>', interceptScript + '</body>');

        const blob = new Blob([htmlWithScript], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        iframe.src = url;

        return () => URL.revokeObjectURL(url);
    }, [slug]);

    return (
        <iframe
            ref={iframeRef}
            style={{ width: '100%', height: '100vh', border: 'none' }}
        />
    );
};

export default Preview;