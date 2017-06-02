
function! MySys()
    if has("win16") || has("win32") || has("win64") || has("win95")
        return "windows"
    elseif has("mac") || has("macunix")
        return "mac"
    elseif has("unix")
        return "linux"
    endif
endfunction

"==============================================================
">  Vundle
"==============================================================
" git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim

" Check if vundle installed
if !filereadable(expand('~/.vim/bundle/Vundle.vim/README.md'))
    echo "Vundle not installed!"
    echo ""
    if confirm("Install Vundle now?(Not for win gVim)", "&Yes\n&No", 0)==1
        silent !git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
        echo "Vundle Installed"
        echo "Run ':PluginInstall' in vim to install bundles"
    endif
else
    " Init vundle
    filetype off                  " required

    " set the runtime path to include Vundle and initialize
    set rtp+=~/.vim/bundle/Vundle.vim
    call vundle#begin()
    Plugin 'gmarik/Vundle.vim'

    Plugin 'L9'             "L9 is required by AutoComplPop
    Plugin 'Br1an6/molokai'
    Plugin 'majutsushi/tagbar'	
    Plugin 'scrooloose/nerdtree'
    Plugin 'kien/ctrlp.vim'
    Plugin 'SirVer/ultisnips'
    Plugin 'honza/vim-snippets'
    Plugin 'tpope/vim-surround'
    Plugin 'bling/vim-airline'
    Plugin 'vim-airline/vim-airline-themes'
    Plugin 'vectorstorm/vim-csyn'
    if MySys() == "mac"
        Plugin 'mattn/emmet-vim'
        Plugin 'nishigori/vim-php-dictionary'
        Plugin 'Shougo/vimproc.vim' " is required by php-dict
        "Plugin 'm2mdas/phpcomplete-extended'
        Plugin 'Valloric/YouCompleteMe'
    else
        Plugin 'vim-scripts/AutoComplPop'	
    endif
    " All of your Plugins must be added before the following line
    call vundle#end()            " required
    filetype plugin indent on    " required
endif

"==============================================================
">  General
"==============================================================

" Sets how many lines of history VIM has to remember
set history=200

" Enable filetype plugins
filetype plugin on
filetype indent on

" Set to auto read when a file is changed from the outside
set autoread

" Set leader key to ','
let mapleader = ","
let g:mapleader = ","

" yank to the system register (*) by default
set clipboard=unnamed

" Set utf8 as standard encoding
let $LANG="en_US.utf-8"
set encoding=utf-8
set fileencodings=usc-bom,utf-8,big5,taiwan,chinese,default,latin1

"==============================================================
">  VIM user interface
"==============================================================
" Set 7 lines to the cursor - when moving vertically using j/k
set so=7

" Turn on the WiLd menu
set wildmenu

" Ignore compiled files
set wildignore=*.o,*~,*.pyc,*.class,*.obj

" Always show current position
set ruler

" Height of the command bar
set cmdheight=1

" A buffer becomes hidden when it is abandoned
set hid

" Configure backspace so it acts as it should act
set backspace=eol,start,indent
set whichwrap+=<,>,h,l

" Ignore case when searching
set ignorecase

" When searching try to be smart about cases
set smartcase

" Highlight search results
set hlsearch

" Makes search act like search in modern browsers
set incsearch

" Don't redraw while executing macros (good performance config)
set lazyredraw

" u got a fast terminal
set ttyfast

" Prevent long line lag
set synmaxcol=300

" For regular expressions turn magic on
set magic

" Show matching brackets when text indicator is over them
set showmatch

" How many tenths of a second to blink when matching brackets
set mat=2

" No annoying sound on errors
set noerrorbells
set novisualbell
set t_vb=
set tm=500

" Always show the status line
set laststatus=2

" hold shift to select and copy text
set mouse=a

"==============================================================
">  Colors and Fonts
"==============================================================

" Enable syntax highlighting
syntax enable 

" set shortmess=atI      " remove start screen
set background=dark
if MySys() != "windows"
    set guifont=Monaco:h14 "mac
else 
    set guifont=Consolas:h14:cANSI
endif
set t_Co=256 "for 256 terminal 
let g:rehash256 = 1
set number
set cursorline
set cindent
set ru

if filereadable(expand('~/.vim/bundle/molokai/README.md')) 
    let g:molokaid_original = 1
    colorscheme molokai
endif

if !has("gui_running")
    hi Normal guibg=NONE ctermbg=NONE
else 
    if MySys() == "windows"
        "Alpha for Windows :vimtweak.dll
        autocmd GUIEnter * call libcallnr("vimtweak.dll", "SetAlpha", 230)
    elseif MySys() == "mac"
        set transparency=5
    endif
endif

"==============================================================
">  Files, backups and undo
"==============================================================

" Turn backup off, since most stuff is in SVN, git et.c anyway...
set nobackup
set nowb
set noswapfile
set noundofile

"==============================================================
">  Text, tab and indent related
"==============================================================

" Use spaces instead of tabs
set expandtab

" Be smart when using tabs ;)
set smarttab

" 1 tab == 4 spaces
set shiftwidth=4
set tabstop=4

" Linebreak on 500 characters
set lbr
set tw=500

set ai   " Auto indent
set si   " Smart indent
set wrap " Wrap lines

" Remove preview window
" set completeopt-=preview

" Auto save and load fold setting
au BufWinLeave *.* silent mkview
au BufWinEnter *.* silent loadview

" Hightlight from start of file
au BufEnter * :syntax sync fromstart

"==============================================================
">  Visual mode related
"==============================================================

" Visual mode pressing * or # searches for the current selection
" Super useful! From an idea by Michael Naumann
vnoremap <silent> * :call VisualSelection('f')<CR>
vnoremap <silent> # :call VisualSelection('b')<CR>

"==============================================================
">  Moving around, tabs, windows and buffers
"==============================================================
" Treat long lines as break lines (useful when moving around in them)
map j gj
map k gk

" Disable highlight when <leader><cr> is pressed
map <leader><CR> :noh<CR>

" Buffers
map <leader>n :bnext<CR>
map <leader>p :bprevious<CR>
map <leader>d :bd<CR>  

" Tab
" Open a newtab with file
noremap <leader>t :tabedit <C-R>=expand("%:p:h")<CR>
" Switch to next tab
noremap <leader><leader> :tabnext<CR>
" Switch to previous tab
noremap <leader>. :tabprevious<CR>

" Switch between tabs
for i in range(1, 9)
    exec 'nmap <leader>'.i.' '.i.'gt<CR>'
endfor

" Windows
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" <Shift>-Arrows to selecting 
"nmap <S-Up> v<Up>
"nmap <S-Down> v<Down>
"nmap <S-Left> v<Left>
"nmap <S-Right> v<Right>
"vmap <S-Up> <Up>
"vmap <S-Down> <Down>
"vmap <S-Left> <Left>
"vmap <S-Right> <Right>

" Return to last edit position when opening files (You want this!)
autocmd BufReadPost *
            \ if line("'\"") > 0 && line("'\"") <= line("$") |
            \   exe "normal! g`\"" |
            \ endif

" Remember info about open buffers on close
set viminfo^=%

"==============================================================
">  Editing mappings
"==============================================================

" Remap VIM 0 to first non-blank character
map 0 ^

" Delete trailing white space on save, useful for Python and CoffeeScript ;)
func! DeleteTrailingWS()
    exe "normal mz"
    %s/\s\+$//ge
    exe "normal `z"
endfunc

autocmd BufWrite *.py,*.coffee,*.js,*.html,*.c,*.cpp,*.xm :call DeleteTrailingWS()

"==============================================================
">  Misc
"==============================================================
" Remove the Windows ^M - when the encodings gets messed up
noremap <Leader>m mmHmt:%s/<C-V><cr>//ge<cr>'tzt'm
noremap <Leader>M :%s/\r/\r/g<CR>

"==============================================================
">  Helper functions
"==============================================================
function! CmdLine(str)
    exe "menu Foo.Bar :" . a:str
    emenu Foo.Bar
    unmenu Foo
endfunction

function! VisualSelection(direction) range
    let l:saved_reg = @"
    execute "normal! vgvy"

    let l:pattern = escape(@", '\\/.*$^~[]')
    let l:pattern = substitute(l:pattern, "\n$", "", "")

    if a:direction == 'b'
        execute "normal ?" . l:pattern . "^M"
    elseif a:direction == 'gv'
        call CmdLine("vimgrep " . '/'. l:pattern . '/' . ' **/*.')
    elseif a:direction == 'replace'
        call CmdLine("%s" . '/'. l:pattern . '/')
    elseif a:direction == 'f'
        execute "normal /" . l:pattern . "^M"
    endif

    let @/ = l:pattern
    let @" = l:saved_reg
endfunction

" Don't override register when pasting
function! RestoreRegister()
    let @" = s:restore_reg
    if &clipboard == "unnamed"
        let @* = s:restore_reg
    endif
    return ''
endfunction

function! s:Repl()
    let s:restore_reg = @"
    return "p@=RestoreRegister()\<cr>"
endfunction

" NB: this supports "rp that replaces the selection by the contents of @r
vnoremap <silent> <expr> p <sid>Repl()

"==============================================================
">  Other
"==============================================================

" Daily routines
noremap <leader>z :w<CR><C-Z>
noremap <leader>w :w<CR>
noremap <leader>x :x<CR>
noremap <leader>q :q!<CR>

noremap <leader>e :edit <C-R>=expand("%:p:h")<CR>/

" Auto reload vimrc when editing it
autocmd! bufwritepost .vimrc source ~/.vimrc

" Split with file
noremap <leader>s :split <C-R>=expand("%:p:h")<CR>/
noremap <leader>v :vsplit <C-R>=expand("%:p:h")<CR>/

" Redraw, useful in terminal when screen getr messed up
nnoremap <leader>rr :redraw!<CR>

" <F2> toggles paste mode
set pastetoggle=<F2>

" <F5> compile / run current file
autocmd filetype ruby nnoremap <F5> :w <bar> exec '!ruby '.shellescape('%') <CR>
autocmd filetype php nnoremap <F5> :w <bar> exec '!php -f '.shellescape('%') <CR>
autocmd filetype python nnoremap <F5> :w <bar> exec '!python3 '.shellescape('%')<CR>
autocmd filetype c nnoremap <F5> :w <bar> exec '!gcc '.shellescape('%').' -O2 && ./a.out'<CR>
autocmd filetype cpp nnoremap <F5> :w <bar> exec '!g++ '.shellescape('%').' -std=c++11 -O2 && ./a.out'<CR>

" <F6> syntax sync
noremap <F6> <Esc>:syntax sync fromstart<CR>
imap <silent><F6> <C-O><F6>

" <F7> spelling check
noremap <silent> <F7> :set spell!<CR>
imap <silent><F7> <C-O><F7>

" <F10> toggles foldenable
noremap <silent> <F10> :set foldenable!<CR>
imap <silent> <F10> <C-O><F10>

"==============================================================
"> Plugins
"==============================================================

let b:javascript_fold=1
" javascript  dom、html css support
let javascript_enable_domhtmlcss=1
if MySys() == "mac"
    " set ~/.vim/dict/
    autocmd FileType javascript set dictionary=$VIMFILES/dict/javascript.dict
    autocmd FileType css set dictionary=$VIMFILES/dict/css.dict
    autocmd FileType php set dictionary=$VIMFILES/bundle/vim-php-dictionary/dict/PHP.dict
    autocmd FileType  php setlocal omnifunc=phpcomplete_extended#CompletePHP
    " emmet
    let g:user_emmet_install_global = 0
    autocmd FileType html,css,php EmmetInstall
    " YouCompleteMe
    let g:ycm_autoclose_preview_window_after_completion = 1
    let g:ycm_global_ycm_extra_conf = "~/.vim/.ycm_extra_conf.py"
    let g:ycm_warning_symbol = '>'
    let g:ycm_key_list_select_completion = ['<C-n>', '<Down>']
    let g:ycm_key_list_previous_completion = ['<C-p>', '<Up>']
    nnoremap <C-]> :YcmCompleter GoTo<CR>

endif

" autoclose complete
au CursorMovedI,InsertLeave * if pumvisible() == 0|silent! pclose|endif
set completeopt=menuone,menu,longest

"  <F3> NERDTree
let NERDTreeChDirMode = 2
autocmd BufEnter * lcd %:p:h
nnoremap <silent> <F3> :execute 'NERDTreeToggle ' . getcwd()<CR>

" <F8> tagbar
nmap <F8> :TagbarToggle<CR> 
let g:tagbar_width = 30

" ctrlp
let g:ctrlp_custom_ignore = { 
            \ 'dir': '\.git$\|\.hg$:|\.svn$\|\.yardoc\|public\/images\|public\/system\|data\|log\|tmp$',
            \ 'file': '\.exe$\|\.so$\|\.dat$'
            \ }
let g:ctrlp_show_hidden = 1
let g:ctrlp_cmd = 'CtrlPMRU'
" leader + b to open buffer list with ctrlp
nmap <leader>b :CtrlPBuffer<CR>

" airline
set ttimeoutlen=50
set noshowmode

if !exists('g:airline_symbols')
    let g:airline_symbols = {}
endif

let g:airline_theme = 'molokai'
let g:airline_powerline_fonts = 0
let g:airline_left_sep = ''
let g:airline_left_alt_sep = ''
let g:airline_right_sep = ''
let g:airline_right_alt_sep = ''
let g:airline_symbols.linenr = '¶'
let g:airline_symbols.branch = '⎇'
let g:airline#extensions#branch#enabled = 1
let g:airline#extensions#branch#empty_message = ''
let g:airline#extensions#whitespace#enabled = 0 

" UltiSnips
let g:UltiSnipsExpandTrigger="<tab>"
let g:UltiSnipsJumpForwardTrigger="<c-b>"
let g:UltiSnipsJumpBackwardTrigger="<c-z>"

" folfing : NotAutoFlod
set foldmethod=syntax
set foldlevel=100
