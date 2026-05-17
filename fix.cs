using System;
using System.IO;
using System.Text;

class Program
{
    static void Main()
    {
        string[] files = Directory.GetFiles(".", "*.html", SearchOption.AllDirectories);
        foreach (string file in files)
        {
            string content = File.ReadAllText(file, Encoding.UTF8);
            string original = content;
            
            content = content.Replace("â€”", "—")
                             .Replace("â€“", "–")
                             .Replace("â€™", "’")
                             .Replace("â€œ", "“")
                             .Replace("â€\x9D", "”")
                             .Replace("â€\x00", "”")
                             .Replace("â€ ", "”")
                             .Replace("â€¢", "•")
                             .Replace("Â·", "·")
                             .Replace("Â©", "©")
                             .Replace("â† ", "←");
                             
            if (content != original)
            {
                File.WriteAllText(file, content, Encoding.UTF8);
                Console.WriteLine("Fixed " + file);
            }
        }
    }
}
