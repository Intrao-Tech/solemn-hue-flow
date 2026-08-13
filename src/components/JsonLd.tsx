/**
 * Renders a JSON-LD block. Placed in the body rather than the head — Google and
 * every AI crawler read `application/ld+json` from anywhere in the document,
 * and keeping it in the component means the schema sits next to the markup it
 * describes.
 *
 * `<` is escaped so a stray `</script>` inside any string can never break out
 * of the block.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
