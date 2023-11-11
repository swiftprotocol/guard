export default function generateAuthorizationMessage(): string {
  const now = new Date().toISOString()
  return `I am authorizing Swift Guard to share my data with the owner of this webpage or application. I understand that they may at any point share my data with third parties. Through this wallet signature, I am expressly authorizing the owner of this webpage or application to access my data. | Signed on ${now}`
}
