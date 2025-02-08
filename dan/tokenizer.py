import nltk
import re

# Ensure that you have the necessary NLTK resources
nltk.download('punkt')

def parse_markdown(md_text):
    blocks = []  # This will store the final blocks of content
    stack = []  # Stack to keep track of the current level
    
    # Split the markdown text into lines
    lines = md_text.splitlines()
    
    for line in lines:
        heading_match = re.match(r'^(#{1,6})\s*(.*)', line)  # Matches markdown headings
        if heading_match:
            # Heading found, determine the level and content
            new_level = len(heading_match.group(1))  # Number of '#' determines the level
            heading_text = heading_match.group(2)
            
            # Add the heading to the stack
            while stack and stack[-1]['level'] >= new_level:
                # Pop from stack until we find a block of lesser level
                blocks.append(stack.pop())
                
            # Push the new heading block onto the stack
            current_block = {
                'level': new_level,
                'heading': heading_text,
                'content': []
            }
            stack.append(current_block)
        
        elif line.strip():  # Non-empty lines that are not headings
            # Determine indentation level
            indent_level = len(line) - len(line.lstrip())
            
            # Handle bullet points or numbered list items
            list_item_match = re.match(r'^\s*(\*|-|\+|\d+\.)\s*(.*)', line)
            if list_item_match:
                # Strip the list marker (bullet point or number)
                list_item_content = list_item_match.group(2).strip()
                if stack:
                    stack[-1]['content'].append({
                        'content': list_item_content,
                        'indent_level': indent_level
                    })  # Add as list content
            elif indent_level > 0:  # Indented content (non-list items)
                # Treat as subcontent to the last heading in the stack
                if stack:
                    stack[-1]['content'].append({
                        'content': line.strip(),
                        'indent_level': indent_level
                    })
            else:
                # Non-indented content is part of the last heading block
                if stack:
                    stack[-1]['content'].append({
                        'content': line.strip(),
                        'indent_level': indent_level
                    })
    
    # Append any remaining blocks in the stack
    while stack:
        blocks.append(stack.pop())
    
    return blocks

def tokenize_blocks(blocks):
    tokenized_blocks = []
    for block in blocks:
        # Tokenize the content of each block
        block_tokens = []
        for item in block['content']:
            tokens = nltk.word_tokenize(item['content'])
            block_tokens.append({
                'tokens': tokens,
                'indent_level': item['indent_level']
            })
        tokenized_blocks.append({
            'heading': block['heading'],
            'level': block['level'],
            'tokens': block_tokens
        })
    return tokenized_blocks

def read_markdown_file(file_path):
    """Reads a markdown file and returns its content as a string."""
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Example usage:
file_path = './based_samples/Lecture 9 Andrew Chen.md'  # Replace with your markdown file path

# Read markdown content from the file
markdown_text = read_markdown_file(file_path)

# Parse and tokenize the markdown content
blocks = parse_markdown(markdown_text)
tokenized_blocks = tokenize_blocks(blocks)


#print(tokenized_blocks[3])
# Print the tokenized blocks with indentation level
for block in tokenized_blocks:
    print(f"Heading: {block['heading']}")
    print(f"Level: {block['level']}")
    for item in block['tokens']:
        print(f"Indentation Level: {item['indent_level']}")
        print(f"Tokens: {item['tokens']}")
    print()