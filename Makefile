all:
	rm -rf build/
	mkdir build
	cp -r plugin/* build/
	rm -f Perspectives.xpi
	sh -c "cd build/ && zip -r ../Perspectives.xpi * -x *\.svn*" 
	rm -rf build	

