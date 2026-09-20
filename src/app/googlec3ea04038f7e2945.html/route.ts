export async function GET() {
  return new Response('google-site-verification: googlec3ea04038f7e2945.html', {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
