copy .jshintrc %USERPROFILE%\.jshintrc
cd lib
call fixmyjs --legacy .
cd ..
del /F %USERPROFILE%\.jshintrc