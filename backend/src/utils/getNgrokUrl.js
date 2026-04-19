async function getNgrokUrl() {
    try {
        const res = await fetch("http://localhost:4040/api/tunnels");
        const data = await res.json();
        return data.tunnels[0].public_url;
    } catch (err) {
        return null;
    }
}

export default getNgrokUrl;
